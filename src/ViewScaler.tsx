import * as React from "react"
import { ChangeEvent, HTMLAttributes } from "react"




export interface ViewScalerProps extends HTMLAttributes<HTMLDivElement>
{
	onScale: ( scale: number ) => any
	value: number
}


export function ViewScaler( { value, onScale }: ViewScalerProps )
{
	if ( value > 2 || value < 0 )
		throw new Error( `ViewScaler expects a value between 0 and 2` )
	
	const setScale = ( e: ChangeEvent<HTMLInputElement> ) => onScale( Number( e.target.value ) )
	
	return (
		<div className="ViewScaler">
			<label>
				Scale the devices up or down
				<input
					type="range"
					min={0.3}
					max={1}
					step={.01}
					value={value}
					onChange={setScale}
				/>
			</label>
		</div>)
}