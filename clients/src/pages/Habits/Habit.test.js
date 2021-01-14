import Habits from  '.';
import { shallow } from 'enzyme';
import { component } from 'react';

describe('Habits', () => {
    let component, form, instance;
    let stubHabits = [
        // { "id": 1, "habitname": "swimming", "" }
        { "habit": "cycling", "user": 2, "weeklyNum": 3, "dailyNum": 1  }
    ]

    beforeEach(() => {
        component = shallow(<Habits />);
    })

    test('it renders', () => { // working
        expect(component.find('#habits')).toHaveLength(1);
    })

    test('it renders the title', () => { // working
        expect(component.find('h3').text()).toContain('Hello from habits page');
    });

    test('it has a plushabit button', () => { // working
        let btn = component.find('#plushabit');
        btn.simulate('click');
        // component.find('button').stimulate('click');
    })

    test('createHabit does things', () => {
        let fakeSubmitEvent = {
            preventDefault: () => {},
            target: {
                habitName: { value: "shopping" },
                user: { value: 2 },
                daysPerWeek: { value: 3 },
                dailyCount: { value: 3 }
            }
        }
        instance = component.instance();
        instance.createHabit(fakeSubmitEvent);
        expect(component.state('habits')).toEqual([...stubHabits, { habit: "shopping", user: 2, weeklyNum: 3, dailyNum: 3 }]);

        

        // const count = Habits.count();
        // request(app).post('/habit').send(habit)
        // const newCount = Habits.count()
        // expect(newCount).toBe(count + 1);
    
    })

    test('a function within createHabit has been called', ()=>{
        const instance = component.instance();
        jest.spyOn(instance, 'dayData');
        // jest.spyOn(instance, 'weekData');
        instance.fetchHabits();
        expect(instance.dayData).toHaveBeenCalledTimes(1);
        // expect(instance.weekData).toHaveBeenCalledTimes(1);
    })

    // test('it renders a form', () => {
    //     form = component.find('#newhabitForm');
    //     // form.toHaveLength(1);
    //     // expect(form).toExist();
    //     expect(form).toHaveLength(1);
    // })

    // test('it renders a form with 1 text input, 2 number inputs and a submit', () => {
    //     form = component.find('#newhabitForm');
    //     expect(form).toHaveLength(1);
    //     const inputs = form.find('input')
    //     expect(inputs).toHaveLength(4);
    //     expect(inputs.first().props().type).toBe('text');
    //     expect(inputs.second().props().type).toBe('number');
    // })

    test('fetchHabits updates the state', () => { // working
        const instance = component.instance();
        instance.fetchHabits();
        expect(component.state('habits')).to(stubHabits);
    })

    test('it renders a paragraph', () => { // working
        const pTag = component.find('p');
        expect(pTag).toHaveLength(1)
    })

    test('it renders the paragraph text', () => { // working
        expect(component.find('p').text()).toContain('All your habits:');
    });
})