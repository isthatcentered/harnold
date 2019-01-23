import * as React from "react"
import { MutableRefObject, useEffect, useRef, useState } from "react"




export interface TimeoutProps
{
	duration: number
	children: ( done: boolean ) => any
}


export function Timeout( { duration, children = () => null }: TimeoutProps )
{
	
	const [ done, setDone ]              = useState( false ),
	      timeout: MutableRefObject<any> = useRef( null )
	
	useEffect( () => {
		
		timeout.current = setTimeout( _ => setDone( true ), duration )
		
		return () => {
			clearTimeout( timeout.current )
		}
	}, [ duration, children ] )
	
	return children( done )
}