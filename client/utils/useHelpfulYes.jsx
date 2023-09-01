import axios from 'axios';

function useHelpfulYes() {
  const registerHelpfulClick = (type, id) => {
    let endpoint;
    console.log(type, id);

    if (type === 'questions') {
      endpoint = `/qa/questions/${id}/helpful`;
    } else if (type === 'answers') {
      endpoint = `/qa/answers/${id}/helpful`;
    } else if (type === 'review') {
      endpoint = `/reviews/${id}/helpful`;
    } else {
      throw new Error('Wrong type!');
    }

    axios.put(endpoint)
      .then((res) => {
        if (res.status === 204) {
          console.log('Update helpful');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return registerHelpfulClick;
}

export default useHelpfulYes;
