import React from 'react';
import { Header } from '../../components/index';
import { WordKitsList } from './components/index';
export function SelectingWordsKitPage() {
    return (
        <div>
            <Header />
            <div>
                <WordKitsList />
            </div>
        </div>
    )
}