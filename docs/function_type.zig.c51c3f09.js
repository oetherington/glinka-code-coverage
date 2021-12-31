var data = {lines:[
{"lineNum":"    1","line":"// glinka"},
{"lineNum":"    2","line":"// Copyright (C) 2021-2022 Ollie Etherington"},
{"lineNum":"    3","line":"// <www.etherington.io>"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// This program is free software: you can redistribute it and/or modify"},
{"lineNum":"    6","line":"// it under the terms of the GNU Affero General Public License as published"},
{"lineNum":"    7","line":"// by the Free Software Foundation, either version 3 of the License, or"},
{"lineNum":"    8","line":"// (at your option) any later version."},
{"lineNum":"    9","line":"//"},
{"lineNum":"   10","line":"// This program is distributed in the hope that it will be useful,"},
{"lineNum":"   11","line":"// but WITHOUT ANY WARRANTY; without even the implied warranty of"},
{"lineNum":"   12","line":"// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the"},
{"lineNum":"   13","line":"// GNU Affero General Public License for more details."},
{"lineNum":"   14","line":"//"},
{"lineNum":"   15","line":"// You should have received a copy of the GNU Affero General Public License"},
{"lineNum":"   16","line":"// along with this program. If not, see <http://www.gnu.org/licenses/>."},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"const std = @import(\"std\");"},
{"lineNum":"   19","line":"const Allocator = std.mem.Allocator;"},
{"lineNum":"   20","line":"const Type = @import(\"type.zig\").Type;"},
{"lineNum":"   21","line":"const allocate = @import(\"../../common/allocate.zig\");"},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"const MapContext = struct {"},
{"lineNum":"   24","line":"    pub fn hash(self: @This(), ty: FunctionType) u64 {","class":"lineCov","hits":"1","order":"2053","possible_hits":"1",},
{"lineNum":"   25","line":"        _ = self;"},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"        var res: u64 = @ptrToInt(ty.ret);","class":"lineCov","hits":"1","order":"2054","possible_hits":"1",},
{"lineNum":"   28","line":"        for (ty.args) |arg|","class":"lineCov","hits":"2","order":"2055","possible_hits":"2",},
{"lineNum":"   29","line":"            res ^= @ptrToInt(arg);","class":"lineCov","hits":"1","order":"2056","possible_hits":"1",},
{"lineNum":"   30","line":""},
{"lineNum":"   31","line":"        return res;","class":"lineCov","hits":"1","order":"2057","possible_hits":"1",},
{"lineNum":"   32","line":"    }"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"    pub fn eql(self: @This(), a: FunctionType, b: FunctionType) bool {","class":"lineCov","hits":"1","order":"2065","possible_hits":"1",},
{"lineNum":"   35","line":"        _ = self;"},
{"lineNum":"   36","line":"        return a.ret == b.ret and std.mem.eql(Type.Ptr, a.args, b.args);","class":"lineCov","hits":"1","order":"2066","possible_hits":"1",},
{"lineNum":"   37","line":"    }"},
{"lineNum":"   38","line":"};"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"const FunctionTypeMap = struct {"},
{"lineNum":"   41","line":"    const Map = std.HashMap("},
{"lineNum":"   42","line":"        FunctionType,"},
{"lineNum":"   43","line":"        Type.Ptr,"},
{"lineNum":"   44","line":"        MapContext,"},
{"lineNum":"   45","line":"        std.hash_map.default_max_load_percentage,"},
{"lineNum":"   46","line":"    );"},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"    map: Map,"},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"    pub fn new(alloc: Allocator) FunctionTypeMap {","class":"lineCov","hits":"1","order":"173","possible_hits":"1",},
{"lineNum":"   51","line":"        return FunctionTypeMap{","class":"lineCov","hits":"1","order":"175","possible_hits":"1",},
{"lineNum":"   52","line":"            .map = Map.init(alloc),","class":"lineCov","hits":"1","order":"174","possible_hits":"1",},
{"lineNum":"   53","line":"        };"},
{"lineNum":"   54","line":"    }"},
{"lineNum":"   55","line":""},
{"lineNum":"   56","line":"    pub fn deinit(self: *FunctionTypeMap) void {","class":"lineCov","hits":"2","order":"315","possible_hits":"2",},
{"lineNum":"   57","line":"        var it = self.map.valueIterator();","class":"lineCov","hits":"1","order":"316","possible_hits":"1",},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"        while (it.next()) |val| {","class":"lineCov","hits":"2","order":"317","possible_hits":"2",},
{"lineNum":"   60","line":"            const funcTy = val.*.*;","class":"lineCov","hits":"1","order":"2070","possible_hits":"1",},
{"lineNum":"   61","line":"            std.debug.assert(std.meta.activeTag(funcTy) == .Function);","class":"lineCov","hits":"1","order":"2071","possible_hits":"1",},
{"lineNum":"   62","line":"            self.map.allocator.free(funcTy.Function.args);","class":"linePartCov","hits":"2","order":"2072","possible_hits":"3",},
{"lineNum":"   63","line":"            self.map.allocator.destroy(val.*);","class":"lineCov","hits":"1","order":"2073","possible_hits":"1",},
{"lineNum":"   64","line":"        }"},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"        self.map.deinit();","class":"lineCov","hits":"1","order":"318","possible_hits":"1",},
{"lineNum":"   67","line":"    }"},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"    pub fn get(","class":"lineCov","hits":"1","order":"2042","possible_hits":"1",},
{"lineNum":"   70","line":"        self: *FunctionTypeMap,"},
{"lineNum":"   71","line":"        ret: Type.Ptr,"},
{"lineNum":"   72","line":"        args: []Type.Ptr,"},
{"lineNum":"   73","line":"    ) Type.Ptr {"},
{"lineNum":"   74","line":"        var funcTy = FunctionType{"},
{"lineNum":"   75","line":"            .ret = ret,","class":"lineCov","hits":"1","order":"2043","possible_hits":"1",},
{"lineNum":"   76","line":"            .args = args,","class":"lineCov","hits":"1","order":"2044","possible_hits":"1",},
{"lineNum":"   77","line":"        };"},
{"lineNum":"   78","line":""},
{"lineNum":"   79","line":"        if (self.map.get(funcTy)) |ty|","class":"lineCov","hits":"2","order":"2045","possible_hits":"2",},
{"lineNum":"   80","line":"            return ty;","class":"lineCov","hits":"1","order":"2067","possible_hits":"1",},
{"lineNum":"   81","line":""},
{"lineNum":"   82","line":"        funcTy.args = allocate.alloc(self.map.allocator, Type.Ptr, args.len);","class":"lineCov","hits":"1","order":"2046","possible_hits":"1",},
{"lineNum":"   83","line":"        std.mem.copy(Type.Ptr, funcTy.args, args);","class":"lineCov","hits":"1","order":"2049","possible_hits":"1",},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"        var ty = allocate.create(self.map.allocator, Type);","class":"lineCov","hits":"1","order":"2050","possible_hits":"1",},
{"lineNum":"   86","line":"        ty.* = Type{ .Function = funcTy };","class":"lineCov","hits":"1","order":"2051","possible_hits":"1",},
{"lineNum":"   87","line":"        self.map.put(funcTy, ty) catch allocate.reportAndExit();","class":"lineCov","hits":"1","order":"2052","possible_hits":"1",},
{"lineNum":"   88","line":"        return ty;","class":"lineCov","hits":"1","order":"2058","possible_hits":"1",},
{"lineNum":"   89","line":"    }"},
{"lineNum":"   90","line":"};"},
{"lineNum":"   91","line":""},
{"lineNum":"   92","line":"pub const FunctionType = struct {"},
{"lineNum":"   93","line":"    pub const Map = FunctionTypeMap;"},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"    ret: Type.Ptr,"},
{"lineNum":"   96","line":"    args: []Type.Ptr,"},
{"lineNum":"   97","line":""},
{"lineNum":"   98","line":"    pub fn write(self: FunctionType, writer: anytype) !void {","class":"linePartCov","hits":"2","order":"1721","possible_hits":"4",},
{"lineNum":"   99","line":"        try writer.print(\"function(\", .{});","class":"linePartCov","hits":"1","order":"1722","possible_hits":"2",},
{"lineNum":"  100","line":""},
{"lineNum":"  101","line":"        var prefix: []const u8 = \"\";","class":"linePartCov","hits":"1","order":"1723","possible_hits":"2",},
{"lineNum":"  102","line":"        for (self.args) |arg| {","class":"linePartCov","hits":"2","order":"1724","possible_hits":"4",},
{"lineNum":"  103","line":"            try writer.print(\"{s}\", .{prefix});","class":"linePartCov","hits":"1","order":"1725","possible_hits":"2",},
{"lineNum":"  104","line":"            try arg.write(writer);","class":"linePartCov","hits":"1","order":"1726","possible_hits":"2",},
{"lineNum":"  105","line":"            prefix = \", \";","class":"linePartCov","hits":"1","order":"1727","possible_hits":"2",},
{"lineNum":"  106","line":"        }"},
{"lineNum":"  107","line":""},
{"lineNum":"  108","line":"        try writer.print(\") : \", .{});","class":"linePartCov","hits":"1","order":"1728","possible_hits":"2",},
{"lineNum":"  109","line":""},
{"lineNum":"  110","line":"        try self.ret.write(writer);","class":"linePartCov","hits":"1","order":"1729","possible_hits":"2",},
{"lineNum":"  111","line":"    }"},
{"lineNum":"  112","line":"};"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2021-12-31 18:19:35", "instrumented" : 38, "covered" : 38,};
var merged_data = [];
