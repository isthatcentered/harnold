import { factory } from "@isthatcentered/charlies-factory"




export interface device
{
	width: number
	height: number
	label: string
}

export const makeDevice = factory<device>( ( faker, index ) => ({
	width:  faker.random.number(),
	height: faker.random.number(),
	label:  `Device ${index} label`,
}) )