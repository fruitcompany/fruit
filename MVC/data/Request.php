<?php

/**
 * Request is the caretaker for processing the data sent by the client.
 * Using ExtJS direct call, it is provided the attributes found in this class.
 * 
 * This class makes it easy to 
 * @author Juan Mendez <info@flexnroses.com>
 *
 */
class Request
{
	private $class_name;
	private $method_name;
	private $actions;
	private $tid;
	private $type;
	private $results;
	
	function __construct($request)
	{
		$this->class_name = $request->action;
		$this->method_name = $request->method;
		$this->tid = $request->tid;
		$this->type = $request->type;
		
		if( is_array( $request->data ) && count( $request->data ) > 0  )
		{
			error_log(print_r($request->data));
			$this->getActions( $request->data[0] );
		}		
	}
	
	/**
	 * assigns actions having one or several records to query.
	 * @param  $params can be an array or a single object
	 */
	private function getActions( $params )
	{
		error_log(print_r($params));
		$this->actions = array();
				
		if( is_array($params) )
		{
			foreach ( $params as $action )
			{
				array_push($this->actions, $action );
			}
		}
		else
		if( get_class($params) == "stdClass" )
		{
			array_push( $this->actions, $params );				
		}	
		
	}
	
	/**
	 * rather than cleaning during the query operation,
	 * this function iterates through each action object.
	 * @param $action
	 */
	function cleanAction( $action )
	{
		$magic_quotes_active = get_magic_quotes_gpc();
		
		foreach ( $action as $field=>$value )
		{
			if( is_string( $value ) )
			{
				if( $magic_quotes_active ) 
				{ 
					$value = stripslashes( $value ); 
				}
				
				$action->$field = mysql_real_escape_string( $value );
			}		
		}
		
		return $action;
	}
	
	/**
	 * we instantiate class dynamically using class_name.
	 * we then call method_name for each action we pass.
	 */
	public function makeCalls()
	{
		$this->results = array();
		$class_instance = new $this->class_name();
		
		
		foreach( $this->actions as $a )
		{
			$result = call_user_func_array(array($class_instance, $this->method_name ), array( $a ) );
			array_push( $this->results, $result );		
		}		
	}
	
	/**
	 * through results accumulated from makeCalls, we go ahead an return an array having
	 * reference of this class attributes and result.
	 */
	public function spitInfo()
	{
		$results = array();
			
		foreach ($this->results as $result ) 
		{
			array_push($results, array( 'type'=>$this->type, 'tid'=>$this->tid, 'action'=>$this->class_name, 
			'method'=>$this->method_name, 'result'=>$result ));	
		}
			
		return $results;
	}
	
}