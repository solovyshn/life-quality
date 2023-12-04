import React from 'react';
import { useParams } from 'react-router-dom';

export default function MainPageDoctor() {
    const { id } = useParams();

    console.log('Doctor ID:', id);

    return (
        <div>
            <h1>Doctor {id}</h1>
            {/* Rest of your component logic */}
        </div>
    );
}
