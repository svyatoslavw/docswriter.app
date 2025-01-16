import Image from 'next/image';

const Logotype = () => {
  return (
    <div className="flex gap-2 items-center">
      <Image
        src="/document-ai-logo.svg"
        width={35}
        height={35}
        alt="Document AI Logo"
      />
      <span className="font-bold text-lg">Docs.ai</span>
    </div>
  );
};

export { Logotype };
