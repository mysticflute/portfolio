import Featured from '@/components/featured/featured';

const featured = [
  'Turning (Game - In Dev)',
  'Recidivia (Game - In Dev)',
  'Vulgaria (Game - In Dev)',
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
