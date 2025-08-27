package com.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.task;
import com.example.demo.repository.taskRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://127.0.0.1:5500")

public class taskController {

    @Autowired
    private taskRepository taskRepository;


    @GetMapping
    public List<task> getAllTasks(){
        return taskRepository.findAll();
    }

    @PostMapping
    public task createTask(@RequestBody task newTask){
        return taskRepository.save(newTask);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id){
        taskRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public task updateTask(@PathVariable Long id, @RequestBody task updatedTask) {
        task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id " + id));

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());

        return taskRepository.save(task);
    }

}
