import React from 'react'
import Infinite from './infinite';

async function page(props: { params: Promise<{ userId: number }> }) {
    const { userId } = await props.params;
    return (
        <Infinite id_person={userId} />
    )
}

export default page