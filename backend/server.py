from flask import Flask, request, jsonify
from print_name import add_two_numbers
from flask_cors import CORS


######################
app = Flask(__name__)
CORS(app)





######################

@app.route('/', methods=['GET'])
def call():
    try:
        return jsonify({'message': 'Base_page'})
    except Exception as e:
        return jsonify({'error': str(e)})



@app.route('/test_data', methods=['GET'])
def base_call():
    try:
        return jsonify({'message': 'Hello, World!'})
    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/predict', methods=['GET'])
def predict_call():
    try:
        param1 = (request.args.get('param1', default=0))
        param2 = (request.args.get('param2', default=0))
        result = add_two_numbers(param1, param2)
        return jsonify({
            'message': 'Parameters received',
            'param1': param1,
            'param2': param2,
            'result': result

        }),200
    except Exception as e:
        return jsonify({'error': str(e)})



if __name__ == '__main__':
    app.run(host='0.0.0.0' ,port = 6967,debug=True)
