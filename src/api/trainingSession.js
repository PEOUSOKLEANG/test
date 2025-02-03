import apiClient from "/apiClient"; 

export const fetchTrainingTypes = async () => {
  const { data } = await apiClient.get("/api/v1/public/training-type/get-list?language_code=EN");
  return data.data.results.map((item) => ({
    label: item.name,
    value: item.training_type_ref.id,
  }));
};

export const fetchTrainingInstitutions = async () => {
  const { data } = await apiClient.get("/api/v1/public/institution/get-list?language_code=EN&institution_type_ref_code=Training");
  return data.data.results.map((item) => ({
    label: item.name,
    value: item.id,
  }));
};

export const fetchTrainingSkills = async () => {
  const { data } = await apiClient.get("/api/v1/public/training-skill/get-list?language_code=EN");
  return data.data.results.map((item) => ({
    label: item.name,
    value: item.training_skill_ref.id,
  }));
};

export const submitTrainingSession = async (formData, uploadedFiles) => {
  const formDataObj = new FormData();

  formDataObj.append("starting_date", formData.startDate);
  formDataObj.append("ending_date", formData.endDate);
  formDataObj.append("institution", formData.institution);
  formDataObj.append("training_skill_ref", formData.trainingSkillRef);
  formDataObj.append("training_status_ref", "1");
  formDataObj.append("training_type_ref", formData.trainingTypeRef);
  formDataObj.append("session_name", formData.sessionName);
  formDataObj.append("training_name", formData.trainingName);
  formDataObj.append("training_phone", formData.trainingPhone);
  formDataObj.append("training_position", formData.trainingPosition);

  uploadedFiles.forEach((file, index) => {
    formDataObj.append(`training_session_record_file[${index}]file`, file);
  });

  return await apiClient.post("/api/v1/public/training-session-record/add-training-record", formDataObj, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
