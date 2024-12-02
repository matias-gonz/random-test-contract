// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleTaskManager {
    struct Task {
        string name;
        bool isCompleted;
    }

    mapping(uint256 => Task) public tasks;
    uint256 private taskCounter;
    string public description;

    constructor(string memory _description) {
        description = _description;
    }

    function addTask(string memory _name) public {
        taskCounter++;
        tasks[taskCounter] = Task(_name, false);
    }

    function completeTask(uint256 _taskId) public {
        require(bytes(tasks[_taskId].name).length > 0, "Task does not exist.");
        tasks[_taskId].isCompleted = true;
    }

    function getTaskCount() public view returns (uint256) {
        return taskCounter;
    }
}