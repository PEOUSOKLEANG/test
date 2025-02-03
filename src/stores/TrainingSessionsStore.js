import { defineStore } from "pinia";
import apiClient from "../api/apiClient"; // Import Axios instance

export const useTrainingSessionsStore = defineStore("trainingSessions", {
  state: () => ({
    sessions: [],
    sessionDetail: null,
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 9,
    totalCount: 0, // Store total count from API
    loading: false,
    error: null,
  }),
  actions: {
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
        // const training_session_record_id =2;
        const response = await apiClient.get(
          `/api/v1/public/training-session-record/get-detail?training_session_record_id=${training_session_record_id}`
        );
        console.log(response.data.data.results);

        const sessionData = response.data.data.results;

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
            sessionData.files?.map((file) => ({
              name: file.name,
              url: file.url,
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
    async updateSessionByID(training_session_record_id , formData) {
      // this.loading = true;
      // this.error = null;
      try {
        
        const formDataObj = new FormData();
    
        // Append course details
        formDataObj.append("starting_date", formData.startDate);
        formDataObj.append("ending_date", formData.endDate);
        formDataObj.append("institution", formData.institution);
        formDataObj.append("training_skill_ref", formData.trainingSkillRef);//trainingSkillRef
        formDataObj.append("training_status_ref", "1");
        formDataObj.append("training_type_ref", formData.trainingTypeRef);//trainingTypeRef
        formDataObj.append("session_name", formData.sessionName);//sessionName
        formDataObj.append("training_name", formData.trainingName);//trainingName
        formDataObj.append("training_phone", formData.trainingPhone);//trainingPhone
        formDataObj.append("training_position", formData.trainingPosition);//trainingPosition
    
        // Append uploaded files
        // uploadedFiles.forEach((file, index) => {
        //   formDataObj.append(`training_session_record_file[${index}]file`, file);
        // });
    
        // Send POST request
        const response = await apiClient.post(
          `/api/v1/public/training-session-record/update-training-session-record?training_session_record_id=${training_session_record_id}`,
          formDataObj,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log(response.formDataObj);
        
        console.log("Success:", response.data);
      } catch (error) {
        errorMessage.value = "Failed to submit form.";
        // console.error("Error submitting form:", error);
        // console.log();
        
      } 
    },
  },
});
