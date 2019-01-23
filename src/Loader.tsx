import * as React from "react"




export interface LoaderProps
{
	duration: number
}


export function Loader( { duration }: LoaderProps )
{
	
	return (
		<div
			className={`Loader`}
		>
			
			<div
				className="Loader-progress"
				style={{
					animationDuration: `${duration / 1000}s`,
				}}
			>
			
			</div>
		</div>
	)
}