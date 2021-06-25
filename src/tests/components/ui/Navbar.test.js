import { mount } from 'enzyme';
import React from 'react';
import { Router, MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../../auth/AuthContext';
import { Navbar } from '../../../components/ui/Navbar';
import { types } from '../../../types/types';

describe('Tests in Navbar component', () => {

    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
    }

    const contextValues = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: 'Daniela'
        }
    }
    
    const wrapper = mount(
        <AuthContext.Provider value={contextValues}>
            <MemoryRouter>
                <Router history={ historyMock }>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    afterEach( () => {
        jest.clearAllMocks();
    });
    
    test('should render correctly', () => {
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe('Daniela');
    });

    test('should call logout and use history', () => {
       
        wrapper.find('button').prop('onClick')();

        expect( contextValues.dispatch ).toHaveBeenCalledWith({
            type: types.logout
        });

        expect( historyMock.replace ).toHaveBeenCalledWith('/login');
        
    });
    
    
})