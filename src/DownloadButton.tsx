type Props = {
	fileName: string;
	href: string;
};

const DownloadButton = ({ fileName, href }: Props): JSX.Element | null => (
	<a
		className='download'
		download={fileName}
		href={href}
	>
		Download as {fileName}
	</a>
);

export default DownloadButton;
