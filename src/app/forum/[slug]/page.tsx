import DiscussionDetail from '@/features/forum/components/DiscussionDetail';

type DiscussionDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const DiscussionDetailPage = async ({ params }: DiscussionDetailPageProps) => {
  const { slug } = await params;

  return <DiscussionDetail slug={slug} />;
};

export default DiscussionDetailPage;