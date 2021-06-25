import React from 'react';
import { mount } from 'enzyme';
import { PrivateRoute } from '../../routers/PrivateRoute';
import { MemoryRouter } from 'react-router-dom';

describe('Tests in PrivateRoute component', () => {
    
    const props = {
        location: {
            pathname: '/marvel'
        }
    }

    Storage.prototype.setItem = jest.fn();

    test('should show the component if is authenticated and save in localStorage', () => {
       
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={true}
                    component={ () => <span>Listo!</span> }
                    { ...props }
                />
            </MemoryRouter>
        );

        expect( wrapper.find('span').exists() ).toBe( true );
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel');
        
    });

    test('should block the component if it is not authenticated', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={ false }
                    component={ () => <span>Listo!</span> }
                    { ...props }
                />
            </MemoryRouter>
        );

        expect( wrapper.html() ).toBe('');
        expect( wrapper.find('span').exists() ).toBe( false );
    });
    
    
})
