import { redirect } from 'next/navigation';
// import { getSecureSession } from '@/core/auth/session';
// import { USER_INFO } from '@/core/config/common-constant';
// import { getServerTheme } from '@/utils/get-server-theme';
// import { generateSSOLink } from '@/features/sso/services/sso-action';
import AskProfessionalForm from '@/features/forum/components/AskProfessionalForm';

const AskProfessionalPage = async () => {
//   const session = await getSecureSession();

//   if (!session[USER_INFO]) {
//     const theme = await getServerTheme();
//     const ssoLink = await generateSSOLink(theme, '/forum/ask');
//     redirect(ssoLink);
//   }

//   const user = session[USER_INFO] as
//     | { firstName?: string; lastName?: string }
//     | undefined;
//   const authorName = `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim();

  return <AskProfessionalForm authorName="You" />;
};

export default AskProfessionalPage;