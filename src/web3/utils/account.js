import React from "react";
import balance from "./balance";
import avatars from "./avatars";
import button from "./connect/button";

export default function Account() {
	return (
		<React.Fragment>
			{button()}
			<div className="account-details">
				<div>{balance()}</div>
				<div>{avatars()}</div>
			</div>
		</React.Fragment>
	);
}
