import { catchErrors } from 'errors';
import { signToken } from 'utils/authToken';
import createAccount from 'database/createGuestAccount';
import { User } from 'entities';
import { findEntityOrThrow } from 'utils/typeorm';

export const createGuestAccount = catchErrors(async (_req, res) => {
  const user = await createAccount();
  res.respond({
    authToken: signToken({ sub: user.id }),
  });
});

export const loginWithRecoveryCode = catchErrors(async (req, res) => {
  const user = await findEntityOrThrow(User, {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    where: { recoveryCode: req.body.recoveryCode },
  });
  res.respond({
    authToken: signToken({ sub: user.id }),
  });
});
