import { factory } from "@isthatcentered/charlies-factory"




export interface device
{
	width: number
	height: number
	label: string
}

export const makeDevice = factory<device>( ( faker, index ) => ({
	width:  `Device ${index} width` as any as number, // for easy test debugging
	height: `Device ${index} height` as any as number, // for easy test debugging
	label:  `Device ${index} label`,
}) )