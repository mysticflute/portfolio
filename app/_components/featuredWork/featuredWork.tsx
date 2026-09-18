import Featured from '@/components/featured/featured';

const featured = [
  'Unannounced Game (2026)',
  'Seasons Turning (TBD)',
  'Recidivia',
  'Vulgaria',
  'D&D Commissions',
  'Unity Asset Packs',
  'Unreal Engine Asset Packs',
];

type Props = {
  animated?: boolean;
};

export default function FeaturedWork({ animated = true }: Props) {
  return (
    <Featured
      title="Featured Work"
      items={featured}
      count={3}
      animated={animated}
      duration={60}
    />
  );
}
