import React from 'react';
import { mount } from 'enzyme';

import { AuthContext } from '../../../auth/AuthContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';

describe('Tests in LoginScreeen component', () => {

    const contextValues = {
        dispatch: jest.fn(),
    }

    const historyMock = {
        replace: jest.fn(),
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValues}>
            <LoginScreen history={historyMock} />
        </AuthContext.Provider>
    );
    
    test('should render correctly', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should dispatch and navigate', () => {

        const handleClick = wrapper.find('button').prop('onClick');

        handleClick();

        expect( contextValues.dispatch ).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'Marlon',
            }
        });

        expect( historyMock.replace ).toHaveBeenCalledWith('/');

        localStorage.setItem('lastPath', '/dc');
        handleClick();

        expect( historyMock.replace ).toHaveBeenCalledWith('/dc');


    });
    
    
})
