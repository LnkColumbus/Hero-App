import React from 'react';
import { mount } from 'enzyme';
import { HeroScreen } from '../../../components/heroes/HeroScreen';
import { Route, MemoryRouter } from 'react-router-dom';

describe('Tests in HeroScreen component', () => {
    
    const historyMock = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn(),
    }
    
    afterEach( () => {
        jest.clearAllMocks();
    });

    test('should render Redirect if there is no arguments in the URL', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={historyMock}/>
            </MemoryRouter>
        );

        expect( wrapper.find('Redirect').exists() ).toBe(true);
    });
    
    test('should show a Hero if exists a param and finds it', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroId" component={ HeroScreen } />
            </MemoryRouter>
        );

        expect( wrapper.find('.row').exists() ).toBe(true);

    });

    test('should go back to prev page with PUSH', () => {
        
        const historyMock = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn(),
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route
                    path="/hero/:heroId"
                    component={ () => <HeroScreen history={historyMock} /> }
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( historyMock.push ).toHaveBeenCalledWith('/');
        expect( historyMock.goBack ).not.toHaveBeenCalled();

    });

    test('should go back to prev page with GOBACK', () => {

        const historyMock = {
            length: 3,
            push: jest.fn(),
            goBack: jest.fn(),
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route
                    path="/hero/:heroId"
                    component={ () => <HeroScreen history={historyMock} /> }
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect( historyMock.push ).not.toHaveBeenCalled();
        expect( historyMock.goBack ).toHaveBeenCalled();

    });

    test('should call Redirect if hero doesn\'t exists', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider123453153']}>
                <Route
                    path="/hero/:heroId"
                    component={ () => <HeroScreen history={historyMock} /> }
                />
            </MemoryRouter>
        );

        expect( wrapper.text() ).toBe('')


    });
    
    
    
    
})
