import { useEffect, useState } from "react"



// @todo: find a way tot test useEffect hook
export function useLocalStorage<T>( key: string, defaultValue: T ): [ T, ( value: T ) => void ]
{
	const [ value, setValue ] = useState( () => {
		return JSON.parse( window.localStorage.getItem( key ) || JSON.stringify( defaultValue ) )
	} )
	
	useEffect( () => {
		window.localStorage.setItem( key, JSON.stringify( value ) )
	}, [ value ] )
	
	return [ value, setValue ]
}