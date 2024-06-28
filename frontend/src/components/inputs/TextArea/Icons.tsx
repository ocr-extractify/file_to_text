import { MdCopyAll } from 'react-icons/md';
import { LuDownload } from 'react-icons/lu';
import IconButton from '@/components/buttons/IconButton';

type Props = {
  data: React.ReactNode;
};

const Icons = ({ data }: Props) => {
  async function copy() {
    await navigator.clipboard.writeText(data as string);
  }

  async function download() {
    const text = data as string;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'result.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="absolute right-4 top-2">
      <IconButton onClick={copy}>
        <MdCopyAll className="w-5 h-5" />
      </IconButton>
      <IconButton onClick={download}>
        <LuDownload className="w-5 h-5" />
      </IconButton>
    </div>
  );
};

export default Icons;
