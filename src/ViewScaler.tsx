import * as React from "react"
import { ChangeEvent, HTMLAttributes } from "react"




export interface ViewScalerProps extends HTMLAttributes<HTMLDivElement>
{
	onScale: ( scale: number ) => any
	value: number
}


export function ViewScaler( { value, onScale, className = "", style = {}, ...props }: ViewScalerProps )
{
	if ( value > 2 || value < 0 )
		throw new Error( `ViewScaler expects a value between 0 and 2` )
	
	const setScale = ( e: ChangeEvent<HTMLInputElement> ) => onScale( Number( e.target.value ) )
	
	return (
		<div
			{...props}
			style={{
				...style,
				right:  0,
				bottom: 0,
				zIndex: 10,
			}}
			className={`${className} ViewScaler`}
		>
			<label className="d-block">
				<span className="sr-only">Scale the devices up or down</span>
				<input
					style={{
						transform:       "rotateZ(90deg)",
						transformOrigin: "right bottom",
						marginRight:     "48px",
						height:          "36px",
						marginBottom:    "16px",
						width:           "calc(100vh - 32px)",
					}}
					type="range"
					min={0.3}
					max={1}
					step={.01}
					value={value}
					onChange={setScale}
					className="d-block"
				/>
			</label>
		</div>)
}