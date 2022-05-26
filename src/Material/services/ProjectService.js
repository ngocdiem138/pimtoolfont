import axios from 'axios'

const PROJECT_BASE_REST_API_URL = 'http://localhost:8080/projects';

class ProjectService{

    getAllProjects(){
        return axios.get(PROJECT_BASE_REST_API_URL)
    }

    createProject(project){
        return axios.post(PROJECT_BASE_REST_API_URL, project)
    }

    getProjectById(projectId){
        return axios.get(PROJECT_BASE_REST_API_URL + '/' + projectId
        );
    }

    updateProject(projectId, project){
        return axios.put(PROJECT_BASE_REST_API_URL + '/' +projectId, project);
    }

    deleteProject(projectId){
        return axios.delete(PROJECT_BASE_REST_API_URL + '/' + projectId);
    }
}

export default new ProjectService();