import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';


describe('Tests in SearchScreen component', () => {
    
    test('should render correctly with default values', () => {

        const wrapper = mount(
          <MemoryRouter initialEntries={['/search']}>
              <Route path="/search" component={ SearchScreen } />
          </MemoryRouter>  
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.alert-info').text().trim() ).toBe('Search a hero');
        
    });

    test('should show Batman and the input with value of the queryString', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>  
        );

        expect( wrapper.find('input').prop('value') ).toBe('batman');
        expect( wrapper ).toMatchSnapshot();

    });

    test('should show an error if doesn\'t find a hero', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>  
        );

        expect( wrapper.find('.alert-danger').exists() ).toBe(true);
        expect( wrapper.find('.alert-danger').text().trim() ).toBe('Theres is no hero with batman123');
        expect( wrapper ).toMatchSnapshot();

    });
    
    test('should call push of history', () => {
       
        const history = {
            push: jest.fn(),
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <Route
                    path="/search"
                    component={ () => <SearchScreen history={history} /> } 
                />
            </MemoryRouter>  
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'batman'
            }
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        expect( history.push ).toHaveBeenCalledWith('?q=batman');

    });
    
    
})
