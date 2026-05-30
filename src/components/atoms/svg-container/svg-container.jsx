import './svg-container.scss';
import User from '@/assets/user.svg?react';
import Bot from '@/assets/bot.svg?react';
import System from '@/assets/system.svg?react';

function SvgContainer({ role }) {

	function getCurrentSvg (roleType) {
		switch(roleType) {
			case 'bot':
				return <Bot className={roleType} />;
			case 'system':
				return <System className={roleType} />
			default:
				return <User className={roleType} />;
		}
	};

	return (
		<div className={`svg-wrapper`}>
			{getCurrentSvg(role)}
		</div>
	);
}

export default SvgContainer;