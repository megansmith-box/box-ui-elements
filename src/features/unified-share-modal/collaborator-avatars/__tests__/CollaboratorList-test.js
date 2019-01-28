import * as React from 'react';

import CollaboratorList from '../CollaboratorList';

describe('features/unified-share-modal/collaborator-avatar-group/CollaboratorList', () => {
    const collaborators = [
        {
            collabID: 1,
            userID: 1,
            type: 'user',
            name: 'test a',
            email: 'testa@box.com',
            hasCustomAvatar: false,
        },
        {
            collabID: 2,
            userID: 2,
            type: 'user',
            name: 'test b',
            email: 'testb@box.com',
        },
        {
            collabID: 3,
            userID: 3,
            type: 'user',
            name: 'test c',
            email: 'testc@box.com',
            profileUrl: 'http://foo.bar.profile',
            hasCustomAvatar: true,
            imageUrl: 'https://foo.bar',
        },
    ];
    collaborators.size = collaborators.length;
    const item = {
        id: '111',
        name: 'test file',
        type: 'file',
        hideCollaborators: false,
    };
    const getWrapper = (props = {}) =>
        shallow(
            <CollaboratorList collaborators={collaborators} name="test" item={item} trackingProps={{}} {...props} />,
        );

    describe('render()', () => {
        test('should render default component', () => {
            const wrapper = getWrapper();
            expect(wrapper).toMatchSnapshot();
        });

        test('should call onDoneClick() when done button is clicked', () => {
            const onDoneClickMock = jest.fn();
            const wrapper = getWrapper({
                onDoneClick: onDoneClickMock,
            });

            const doneBtn = wrapper.find('Button');
            expect(doneBtn.length).toBe(1);
            doneBtn.simulate('click');

            expect(onDoneClickMock).toHaveBeenCalled();
        });

        test('should render extra row with View additional people if list.size > maxCollaboratorListSize', () => {
            const wrapper = getWrapper({
                maxCollaboratorListSize: 2,
            });
            expect(wrapper).toMatchSnapshot();
        });
    });
});