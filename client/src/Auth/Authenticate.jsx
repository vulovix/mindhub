import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from 'shared/utils/api';
import toast from 'shared/utils/toast';
import { getStoredAuthToken, storeAuthToken } from 'shared/utils/authToken';
import { Button, Input, PageLoader } from 'shared/components';
import { AuthenticatePage, AuthenticatePageControls, InputLabel, InputCont } from './Styles';

const Authenticate = () => {
  const history = useHistory();
  const [recoveryCode, setRecoveryCode] = useState('');
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

  const onKeyDown = async e => {
    if (e.key === 'Enter' && recoveryCode.trim()) {
      try {
        const { authToken } = await api.post('/authentication/login', {
          recoveryCode: recoveryCode.trim(),
        });
        storeAuthToken(authToken);
        history.push('/');
      } catch (error) {
        toast.error(error);
      }
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
      <AuthenticatePageControls>
        <InputCont>
          <InputLabel>Already registered?</InputLabel>
          <Input
            onChange={setRecoveryCode}
            onKeyDown={onKeyDown}
            placeholder="Enter your recovery code..."
            type="password"
          />
        </InputCont>
        <div />
        <InputCont>
          <InputLabel>No account?</InputLabel>
          <Button onClick={createGuestAccount}>Join as a Guest</Button>
        </InputCont>
      </AuthenticatePageControls>
    </AuthenticatePage>
  );
};

export default Authenticate;
