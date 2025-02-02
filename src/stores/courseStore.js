

import { defineStore } from "pinia";
import { ref } from "vue";
import apiClient from "../api/apiClient"; // Import Axios instance

export const useCourseStore = defineStore("courseStore", () => {
  const selectTrainingTypeOptions = ref([]);
  const selectTrainingInstitution = ref([]);
  const selectTrainingSkill = ref([]);
  const loading = ref(false); 
  const errorMessage = ref(null); 

  // Fetch Training Types
  const fetchTrainingTypes = async () => {
    loading.value = true;
    try {
      const { data } = await apiClient.get("/api/v1/public/training-type/get-list?language_code=EN");
      selectTrainingTypeOptions.value = data.data.results.map((item) => ({
        label: item.name,
        value: item.training_type_ref.id,
      }));
    } catch (error) {
      errorMessage.value = "Failed to fetch training types.";
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  // Fetch Training Institutions
  const fetchTrainingInstitutions = async () => {
    loading.value = true;
    try {
      const { data } = await apiClient.get(
        "/api/v1/public/institution/get-list?language_code=EN&institution_type_ref_code=Training"
      );
      selectTrainingInstitution.value = data.data.results.map((item) => ({
        label: item.name,
        value: item.id,
      }));
    } catch (error) {
      errorMessage.value = "Failed to fetch training institutions.";
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  // Fetch Training Skills
  const fetchTrainingSkills = async () => {
    loading.value = true;
    try {
      const { data } = await apiClient.get("/api/v1/public/training-skill/get-list?language_code=EN");
      selectTrainingSkill.value = data.data.results.map((item) => ({
        label: item.name,
        value: item.training_skill_ref.id,
      }));
    } catch (error) {
      errorMessage.value = "Failed to fetch training skills.";
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

 // Function to submit course data
 const submitForm = async (formData, uploadedFiles) => {
  try {
    loading.value = true;
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
    uploadedFiles.forEach((file, index) => {
      formDataObj.append(`training_session_record_file[${index}]file`, file);
    });

    // Send POST request
    const response = await apiClient.post(
      "/api/v1/public/training-session-record/add-training-record",
      formDataObj,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    console.log(response.formDataObj);
    
    console.log("Success:", response.data);
  } catch (error) {
    errorMessage.value = "Failed to submit form.";
    console.error("Error submitting form:", error);
    console.log();
    
  } finally {
    loading.value = false;
  }
};

  return {
    selectTrainingTypeOptions,
    selectTrainingInstitution,
    selectTrainingSkill,
    fetchTrainingTypes,
    fetchTrainingInstitutions,
    fetchTrainingSkills,
    // submitCourseData,
    submitForm,
    loading,
    errorMessage,
  };
});
