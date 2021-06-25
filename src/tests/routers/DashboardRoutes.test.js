import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { DashboardRoutes } from '../../routers/DashboardRoutes';

describe('Tests in DashboardRoutes component', () => {
    
    const contextValues = {
        dispatch: jest.fn(),
        user: {
            name: 'Daniela',
            logged: true
        }
    }

    test('should render correctly', () => {

        const wrapper = mount(
            <AuthContext.Provider value={ contextValues }>
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe('Daniela');
    });
    
})
