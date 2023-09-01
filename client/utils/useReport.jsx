import axios from 'axios';

function useReport() {
  const registerReportClick = (type, id) => {
    let endpoint;
    console.log(type, id);

    if (type === 'questions') {
      endpoint = `/qa/questions/${id}/report`;
    } else if (type === 'answers') {
      endpoint = `/qa/answers/${id}/report`;
    } else if (type === 'review') {
      endpoint = `/reviews/${id}/report`;
    } else {
      throw new Error('Wrong type!');
    }

    axios.put(endpoint)
      .then((res) => {
        if (res.status === 204) {
          console.log('Update report');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return registerReportClick;
}

export default useReport;
