import axios from 'axios'

const PROJECT_BASE_REST_API_URL = 'http://localhost:8080/projects';

class ProjectService{

    getAllProjects(){
        return axios.get(PROJECT_BASE_REST_API_URL)
    }

    createProject(project){
        return axios.put(PROJECT_BASE_REST_API_URL+"/new", project)
    }

    getProjectById(projectId){
        return axios.get(PROJECT_BASE_REST_API_URL + '/' + projectId);
    }

    getProjectByKeyWordAndStatus(keyword, status){
        return axios.get(PROJECT_BASE_REST_API_URL + '/search?' +'keyword='+  keyword + '&status=' +status);
    }

    updateProject(projectId, project){
        return axios.put(PROJECT_BASE_REST_API_URL + '/update/' +projectId, project);
    }

    deleteProject(projectId){
        return axios.delete(PROJECT_BASE_REST_API_URL + '/delete/' + projectId);
    }
    
}

export default new ProjectService();