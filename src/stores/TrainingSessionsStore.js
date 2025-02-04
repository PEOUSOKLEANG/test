import { defineStore } from "pinia";
import apiClient from "../api/apiClient"; // Import Axios instance
import { fetchTrainingTypes, fetchTrainingInstitutions, fetchTrainingSkills, submitTrainingSession, submitUpdateSessionByID} from "../api/trainingSession";

export const useTrainingSessionsStore = defineStore("trainingSessions", {
  state: () => ({
    sessions: [],
    selectTrainingType: [],
    selectTrainingInstitution: [],
    selectTrainingSkill: [],
    sessionDetail: null,
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 9,
    totalCount: 0, // Store total count from API
    loading: false,
    error: null,
  }),
  actions: {
    async getTrainingTypes() {
      this.loading = true;
      try {
        this.selectTrainingType = await fetchTrainingTypes();
      } catch (error) {
        this.errorMessage = "Failed to fetch training types.";
      } finally {
        this.loading = false;
      }
    },

    async getTrainingInstitutions() {
      this.loading = true;
      try {
        this.selectTrainingInstitution = await fetchTrainingInstitutions();
      } catch (error) {
        this.errorMessage = "Failed to fetch training institutions.";
      } finally {
        this.loading = false;
      }
    },

    async getTrainingSkills() {
      this.loading = true;
      try {
        this.selectTrainingSkill = await fetchTrainingSkills();
      } catch (error) {
        this.errorMessage = "Failed to fetch training skills.";
      } finally {
        this.loading = false;
      }
    },

    async submitSession(formData, uploadedFiles) {
      this.loading = true;
      try {
        await submitTrainingSession(formData, uploadedFiles);
      } catch (error) {
        this.errorMessage = "Failed to submit form.";
      } finally {
        this.loading = false;
      }
    },

    
    async fetchSessions(page = 1) {
      this.loading = true;
      this.error = null;

      try {
        // Calculate offset for pagination
        const offset = (page - 1) * this.itemsPerPage;

        // Fetch session data from API
        const response = await apiClient.get(
          `/api/v1/public/training-session-record/get-list?language_code=EN&limit=${this.itemsPerPage}&offset=${offset}`
        );

        // Map response data to store state
        this.sessions = response.data.data.results.map((session) => ({
          id: session.id,
          trainingName: session.training_name,
          sessionName: session.session_name,
          startingDate: session.starting_date,
          endingDate: session.ending_date,
          trainingInstitution: session.institution.name,
        }));

        // Update total count and pages
        this.totalCount = response.data.data.count;
        this.totalPages = Math.ceil(this.totalCount / this.itemsPerPage);
      } catch (error) {
        this.error = "Failed to fetch training sessions.";
        console.error("Error fetching sessions:", error);
      } finally {
        this.loading = false;
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchSessions(this.currentPage);
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchSessions(this.currentPage);
      }
    },

    //paramater training_session_record_id
    async fetchSessionsDetailById(training_session_record_id) {
      this.loading = true;
      this.error = null;
      this.sessionDetail = null; // Clear old data before fetching

      try {
        
        const response = await apiClient.get(
          `/api/v1/public/training-session-record/get-detail?training_session_record_id=${training_session_record_id}`
        );
        console.log(response.data.data.results);

        const sessionData = response.data.data.results;
        const BASE_URL = import.meta.env.VITE_API_URL;
        this.sessionDetail = {
          id: sessionData.id,
          sessionName: sessionData.session_name,
          startingDate: sessionData.starting_date,
          endingDate: sessionData.ending_date,
          trainingType: {
            label: sessionData.training_type?.name || "Unknown",
            value: sessionData.training_type?.training_type_ref?.id || null,
          },
          trainingSkill: {
            label: sessionData.training_skill?.name || "Unknown",
            value: sessionData.training_skill?.trainging_skill_ref?.id || null,
          },
          trainingInstitution: {
            label: sessionData.institution?.name || "Unknown",
            value: sessionData.institution?.id || null,
          },
          trainer: {
            name: sessionData.training_name || "N/A",
            phone: sessionData.training_phone || "N/A",
            position: sessionData.training_position || "N/A",
          },
          files:
            sessionData.training_session_record_file?.map((file) => ({
              name: `File ${file.id}`,
              url: `${BASE_URL}${file.file}`, // Correctly prefix the URL
            })) || [],
          description: sessionData.description || "",
        };
      } catch (error) {
        this.error = "Fail to fetch session destails.";
        console.log("Error fetching session detail", error);
      } finally {
        this.loading = false;
      }
    },

    //edit file
    async updateSessionByID(
      training_session_record_id,
      formData,
      uploadedFiles
    ) {
      try {
        await submitUpdateSessionByID(training_session_record_id,
          formData,
          uploadedFiles);
      } catch (error) {
        errorMessage.value = "Failed to submit form.";
        // console.error("Error submitting form:", error);
      
      }
    },
  },
});
