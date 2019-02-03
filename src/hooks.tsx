import { useEffect, useState } from "react"
import { parse } from "query-string"


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


export function useResetWindowPosition( watch: any )
{
	useEffect( () => {
		window.scrollTo( 0, 0 )
	}, [ watch ] )
}


export function useUrlQuery<T>( search: string ): Partial<T | { [ key: string ]: string }>
{
	return parse( search ) as any
}