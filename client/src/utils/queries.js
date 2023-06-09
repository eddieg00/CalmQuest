import {gql} from "@apollo/client";


export const GET_USERs = gql`
query users {
    users {
        _id
        name
        email
        task {
            _id
            task
            completed
        }
    }
}
`

export const ME = gql`
query me {
    me {
        _id
        name
        email
        task {
            _id
            task
            completed
        }
    }
}
`
export const GET_TASKs = gql`
query getTasks {
    tasks {
        _id
        task
        completed
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