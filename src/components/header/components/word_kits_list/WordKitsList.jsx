import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import { commonDataSelectors } from '../../../../redux/selectors/training/common/common_data_selectors';
import { fetchingWords } from '../../../../redux/actions/training/common/common_training_actions';   //! rename!! what did i say words about????
import { fetchingWordSetsNames } from '../../../../redux/actions/training/common/common_training_actions'; //! все в одному редюсері

export const WordKitsList = function ({onVisibleComponent}) {
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(fetchingWordSetsNames()) 
    }, []);

    const wordKitNames = useSelector((state) => commonDataSelectors.getAllSetsNames(state));
    const onSelectingKitName = event => {
            const kitName = event.nativeEvent.target.childNodes[0].textContent
            onVisibleComponent('WordKitsList')()
            dispatch(fetchingWords(kitName))
    };

    return (
        <ul className = {styles['list']}
            onClick = { onSelectingKitName }
            >
            { wordKitNames.map(kit => {
                return (
                    <li key = {kit._id} className = {styles['list-item']}>
                        <NavLink className = {styles['link']} to = {`/wordset/${kit.serviceInfo.name}`}>
                            {kit.serviceInfo.name}
                        </NavLink>
                    </li>
                )
            }) }
        </ul>
    )
}

