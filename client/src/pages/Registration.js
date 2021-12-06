import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../variables/api';

function Registration() {
	const initialValues = {
		title: '',
		username: '',
	};

	const validationSchema = Yup.object().shape({
		username: Yup.string().min(3).max(15).required(),
		password: Yup.string().min(4).max(20).required(),
	});

	const onSubmit = async (data) => {
		try {
			const response = await api.post('auth', data); // esse data vem do validation schema
		} catch {
			console.log('error');
		}
	};

	return (
		<div>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				<Form className='formContainer'>
					<label>Username: </label>
					<ErrorMessage name='username' component='span' />
					<Field
						autocomplete='off'
						id='inputCreatePost'
						name='username'
						placeholder='(Ex. John123...)'
					/>

					<label>Password: </label>
					<ErrorMessage name='password' component='span' />
					<Field
						autocomplete='off'
						id='inputCreatePost'
						name='password'
						placeholder='Your password'
                        type="password"
					/>

					<button type='submit'> Register</button>
				</Form>
			</Formik>
		</div>
	);
}

export default Registration;
