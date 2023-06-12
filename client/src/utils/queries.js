import {gql} from "@apollo/client";


export const GET_USERS = gql`
query users {
    users {
        _id
        name
        email
        tasks {
            _id
            task
            completed
            trait
        }
    }
}
`

export const ME = gql`
query me {
    me {
        id
        name
        email
        tasks {
            id
            task
            completed
            trait
        }
    }
}
`
export const GET_TASKS = gql`
query getTasks {
    me {
        _id
        name
        email
        tasks {
            _id
            task
            completed
            trait
        }
    }
}
`


export const SAVE_TASK = gql`
  mutation SaveTask($userId: ID!, $taskId: ID!) {
    saveTask(userId: $userId, taskId: $taskId) {
      _id
      task
      completed
    }
  }
`;