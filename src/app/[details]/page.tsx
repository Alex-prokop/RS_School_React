import Details from '../../components/Details';

export default function DetailsPage({
  params,
}: {
  params: { details: string };
}) {
  const { details } = params;
  return <Details id={details} />;
}
