class MainApi {
    _request = async (url, options) => {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    };
  
    getList = () => {
        return this._request('https://t-pay.iqfit.app/subscribe/list-test', {
          method: 'GET',
        });
      };
  }
      
  const mainApi = new MainApi();
  
  export default mainApi;
  