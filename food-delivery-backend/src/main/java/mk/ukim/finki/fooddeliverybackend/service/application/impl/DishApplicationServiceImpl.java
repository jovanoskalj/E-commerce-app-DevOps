package mk.ukim.finki.fooddeliverybackend.service.application.impl;

import mk.ukim.finki.fooddeliverybackend.dto.domain.CreateDishDto;
import mk.ukim.finki.fooddeliverybackend.dto.domain.DisplayDishDetailsDto;
import mk.ukim.finki.fooddeliverybackend.dto.domain.DisplayDishDto;
import mk.ukim.finki.fooddeliverybackend.dto.domain.DisplayOrderDto;
import mk.ukim.finki.fooddeliverybackend.model.domain.Dish;
import mk.ukim.finki.fooddeliverybackend.model.domain.Order;
import mk.ukim.finki.fooddeliverybackend.model.domain.Restaurant;
import mk.ukim.finki.fooddeliverybackend.model.exceptions.DishNotFoundException;
import mk.ukim.finki.fooddeliverybackend.model.exceptions.RestaurantNotFoundException;
import mk.ukim.finki.fooddeliverybackend.service.application.DishApplicationService;
import mk.ukim.finki.fooddeliverybackend.service.domain.DishService;
import mk.ukim.finki.fooddeliverybackend.service.domain.OrderService;
import mk.ukim.finki.fooddeliverybackend.service.domain.RestaurantService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DishApplicationServiceImpl implements DishApplicationService {

    private final DishService dishService;
    private final RestaurantService restaurantService;
    private final OrderService orderService;

    public DishApplicationServiceImpl(DishService dishService, RestaurantService restaurantService, OrderService orderService) {
        this.dishService = dishService;
        this.restaurantService = restaurantService;
        this.orderService = orderService;
    }

    @Override
    public List<DisplayDishDto> findAll() {
        // TODO: Implement this.
        return DisplayDishDto.from(dishService.findAll());
    }

    @Override
    public Optional<DisplayDishDto> findById(Long id) {
        return dishService
                .findById(id)
                .map(DisplayDishDto::from);
    }

    @Override
    public Optional<DisplayDishDetailsDto> findByIdWithDetails(Long id) {
        // TODO: Implement this.
        return dishService.findById(id).map(DisplayDishDetailsDto::from);
    }

    @Override
    public DisplayDishDto save(CreateDishDto createDishDto) {
        Optional<Restaurant> res = restaurantService.findById(createDishDto.restaurantId());


        if (res.isPresent()) {
            return DisplayDishDto.from(dishService.save(createDishDto.toDish(res.get())));


        }
        throw  new DishNotFoundException(createDishDto.restaurantId());

    }

    @Override
    public Optional<DisplayDishDto> update(Long id, CreateDishDto createDishDto) {
        Optional<Restaurant> restaurant = restaurantService.findById(createDishDto.restaurantId());

        return dishService.update(id,
                        createDishDto.toDish(
                                restaurant.orElse(null)

                        )
                )
                .map(DisplayDishDto::from);

    }

    @Override
    public Optional<DisplayDishDto> deleteById(Long id) {

        return dishService.deleteById(id).map(DisplayDishDto::from);
    }

    @Override
    public DisplayOrderDto addToOrder(Long id, String username) {
        Order order = orderService.findPending(username).get();
        Dish dish = dishService.findById(id).get();
       return DisplayOrderDto.from(dishService.addToOrder(dish,order));
    }

    @Override
    public DisplayOrderDto removeFromOrder(Long id, String username) {
        Order order = orderService.findPending(username).get();
        Dish dish = dishService.findById(id).get();
        return DisplayOrderDto.from(dishService.removeFromOrder(dish,order));
    }

}
