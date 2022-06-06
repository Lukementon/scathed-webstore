import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const useInitGoogleClient = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          '198030412686-r0sbk82tcl7cjjkvtngegs8vs5usvh82.apps.googleusercontent.com',
        scope: '',
      });
    }
    gapi.load('client:auth2', start);
  }, []);
};

export default useInitGoogleClient;
export { useInitGoogleClient };
