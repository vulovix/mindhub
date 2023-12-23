import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from 'shared/utils/api';
import toast from 'shared/utils/toast';
import { getStoredAuthToken, storeAuthToken } from 'shared/utils/authToken';
import { Button, PageLoader } from 'shared/components';
import { AuthenticatePage, AuthenticatePageControls } from './Styles';

const Authenticate = () => {
  const history = useHistory();
  const [hasAccount, setHasAccount] = useState(null);

  const createGuestAccount = async () => {
    try {
      const { authToken } = await api.post('/authentication/guest');
      storeAuthToken(authToken);
      history.push('/');
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (!getStoredAuthToken()) {
      setHasAccount(false);
    }
  }, [history]);

  if (hasAccount == null) {
    return <PageLoader />;
  }
  return (
    <AuthenticatePage>
      <h4>No account yet?</h4>
      <AuthenticatePageControls>
        <Button onClick={createGuestAccount}>Join as a Guest</Button>
      </AuthenticatePageControls>
    </AuthenticatePage>
  );
};

export default Authenticate;
