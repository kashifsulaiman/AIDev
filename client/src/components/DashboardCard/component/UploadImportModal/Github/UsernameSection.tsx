import { GithubIcon } from '@/components/SVG';
import { StoreModel } from '@/redux/model';
import { useStoreState } from 'easy-peasy';

export default function UsernameSection() {
  const githubAuth = useStoreState<StoreModel>(
    (state) => state?.githubAuthModel.githubModel
  );

  return (
    <p className="flex items-center gap-2 whitespace-normal py-2">
      <GithubIcon classes="size-8 text-white bg-black rounded-full p-1.5" />
      <span className="text-lg font-semibold">{githubAuth.username}</span>
    </p>
  );
}
