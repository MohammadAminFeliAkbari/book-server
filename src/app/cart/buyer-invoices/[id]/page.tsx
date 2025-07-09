import React from 'react'
import Form from './Form'

async function page({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params
    return (
        <div><Form id={id} /></div>
    )
}

export default page