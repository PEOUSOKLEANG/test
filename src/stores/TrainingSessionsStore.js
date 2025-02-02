// stores/useTrainingSessions.js
import { defineStore } from 'pinia';
import apiClient from "../api/apiClient"; // Import Axios instance

export const useTrainingSessionsStore = defineStore('trainingSessions', {
  state: () => ({
    sessions: [],
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 9,
  }),
  actions: {
    async fetchSessions(page = 1) {
      try {
        // Calculate offset based on the page and itemsPerPage
        const offset = (page - 1) * this.itemsPerPage;
        
        // Request the sessions with the correct pagination parameters
        const response = await apiClient.get(
          `/api/v1/public/training-session-record/get-list?language_code=EN&limit=${this.itemsPerPage}&offset=${offset}`
        );
        
        // Map the response data to the desired format
        this.sessions = response.data.data.results.map(session => ({
          id: session.id,
          trainingName: session.training_name,
          sessionName: session.session_name,
          startingDate: session.starting_date,
          endingDate: session.ending_date,
          trainingInstitution: session.institution.name,
          totalCount:session.count
        }));
        
        // Update totalPages based on the count of sessions returned
        this.totalPages = Math.ceil(response.data.data.count / this.itemsPerPage);

        // Log the total count for debugging
        console.log(response.data.data.count);
      } catch (error) {
        console.error('Error fetching sessions:', error);
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
  },
});
